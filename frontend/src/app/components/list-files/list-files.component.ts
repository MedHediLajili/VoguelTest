import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialogConfig, MatDialog } from '@angular/material';

import { Fichier } from 'src/app/models/fichier';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'fileUrl', 'createdAt'];
  listData: MatTableDataSource<Fichier>;
  files: Fichier[];

  constructor(private fileService: FilesService) {
  }

  getAllFiles(){
    this.fileService.getFiles().subscribe(
      (data)=> {
        this.files= data;
        this.listData = new MatTableDataSource(this.files);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
    });
  }


  ngOnInit() {
    this.getAllFiles();
  }

  /*ngAfterViewInit() {

  }*/


  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();

    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
  }

}
