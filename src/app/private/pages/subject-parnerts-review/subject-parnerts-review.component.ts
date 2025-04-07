import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClassParnertsModel } from 'src/app/core/model/ClassParnertsModel';
import { SubjetServiceService } from 'src/app/core/services/subjet.service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject-parnerts-review',
  templateUrl: './subject-parnerts-review.component.html',
  styleUrls: ['./subject-parnerts-review.component.scss']
})
export class SubjectParnertsReviewComponent implements OnInit {
  parnerts = new MatTableDataSource<ClassParnertsModel>();
  userAccess: any;
  //Columnas
  displayedColumns: string[] = ['NameSubject', 'TeacherName', 'ParnertName'];

  constructor(private subjetService: SubjetServiceService,
    private route: Router
  ) {

  }
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if ((userString ? JSON.parse(userString) : null) == null) {
      this.route.navigate(['login']);
    } else {
      this.userAccess = userString ? JSON.parse(userString) : null;
      this.subjetService.GetClassParnerts(this.userAccess[0].document?.toString()).subscribe(
        response => {
          this.parnerts = new MatTableDataSource(response.data)
        },
        error => {
          Swal.fire({
            text: error.error.error,
            icon: "info"
          });
        }
      )
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.parnerts.filter = filterValue.trim().toLowerCase();
  }
}
