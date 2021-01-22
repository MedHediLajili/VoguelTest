import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FilesService } from 'src/app/services/files.service';
import { MatSnackBar } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {
  @ViewChild('f',{static: false}) addFileForm: NgForm;
  selectedFile: File = null;
  nameFile: string = null;

  constructor(private fileService: FilesService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.selectedFile = files.item(0);
    this.nameFile = this.selectedFile.name;
}

onSubmit() {
  const fd = new FormData();
  fd.append('fileName', this.addFileForm.value.name);
  fd.append('fileUpload',this.selectedFile, this.selectedFile.name);
  this.fileService.addFile(fd).subscribe(
    ()=> {

      this.addFileForm.setValue({'name': null, 'fileUpload': null});
      this.nameFile = null;

      this.snackbar.open('File uploaded Sucessfuly', 'Close', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
      this.router.navigate(['/files']);
  });
}

}
