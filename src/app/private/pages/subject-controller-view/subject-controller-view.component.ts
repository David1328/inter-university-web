import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectModel } from 'src/app/core/model/SubjetModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubjetServiceService } from 'src/app/core/services/subjet.service.service';
import { ClassRegistrationServiceService } from 'src/app/core/services/class-registration.service.service';
import { ClassRegistrationModel } from 'src/app/core/model/ClassRegistrationModel';
/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-subject-controller-view',
  templateUrl: './subject-controller-view.component.html',
  styleUrls: ['./subject-controller-view.component.scss']
})
export class SubjectControllerViewComponent implements OnInit {
  //Listas para llenar tablas faltantes y las que ya se agregaron
  subjetForAssigned = new MatTableDataSource<SubjectModel>();
  subjetAssigned = new MatTableDataSource<SubjectModel>();

  //Columnas
  displayedColumns: string[] = ['NameSubject', 'NumCredits', 'TeacherId', 'AddSubjet'];
  userAccess:any;
  constructor(private serviceSubjet: SubjetServiceService,
    private serviceClassRegistration:ClassRegistrationServiceService,
    private route: Router) { }

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if((userString ? JSON.parse(userString) : null) ==null){
      this.route.navigate(['login']);
    }else{
      this.userAccess= userString ? JSON.parse(userString) : null;
      this.serviceSubjet.getSubjetsForAdd(this.userAccess[0].document?.toString()).subscribe(
        response => {
          this.subjetForAssigned = new MatTableDataSource(response.data)
        },
        error => {
          Swal.fire({
            text:error.error.error,
            icon: "info"
          });
        });
      this.serviceSubjet.getSubjetAsignated(this.userAccess[0].document).subscribe(
        response => {
          this.subjetAssigned = new MatTableDataSource(response.data)
        },
        error => {
          Swal.fire({
            text:error.error.error,
            icon: "info"
          });
        })
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.subjetForAssigned.filter = filterValue.trim().toLowerCase();
  }
  applyWithoutSubjet(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.subjetAssigned.filter = filterValue.trim().toLowerCase();
  }
  public AddSubjet(idSubjet: string) {
    let subjetToAdd = new ClassRegistrationModel();
    subjetToAdd.idStudent=this.userAccess[0].document;
    subjetToAdd.idSubjet=idSubjet;
    this.serviceClassRegistration.PostAddSubjet(subjetToAdd).subscribe(
      response => {
        Swal.fire({
          text: response.data,
          icon: "success"
        });
        this.refreshTable();
      },
      error => {
        console.log(error)
        Swal.fire({
          text: error.error.error,
          icon: "error"
        });
        this.refreshTable();
      }
    )
  }
  public DeleteSubjet(idSubjet: string){
    this.serviceClassRegistration.DeleteSubjetToStudent(this.userAccess[0].document,idSubjet).subscribe(
      response => {
        Swal.fire({
          text: response.data,
          icon: "success"
        });
        this.refreshTable();
      },
      error => {
        Swal.fire({
          text: error.error.error,
          icon: "error"
        });
        this.refreshTable();
      }
    )
  }
  public refreshTable(){
    this.subjetForAssigned.data=[];
    this.subjetAssigned.data=[];
    this.ngOnInit();
  }
}