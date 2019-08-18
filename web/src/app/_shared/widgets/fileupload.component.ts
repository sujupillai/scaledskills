import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'vo-mat-fileUpload',
  templateUrl: './fileupload.component.html',
})
export class FileuploadComponent {
  @Input()
  mode
  @Input()
  names
  @Input()
  url
  @Input()
  method
  @Input()
  multiple
  @Input()
  disabled
  @Input()
  accept
  @Input()
  maxFileSize
  @Input()
  auto = true
  @Input()
  withCredentials
  @Input()
  invalidFileSizeMessageSummary
  @Input()
  invalidFileSizeMessageDetail
  @Input()
  invalidFileTypeMessageSummary
  @Input()
  invalidFileTypeMessageDetail
  @Input()
  previewWidth
  @Input()
  chooseLabel = 'Choose'
  @Input()
  uploadLabel = 'Upload'
  @Input()
  cancelLabel = 'Cance'
  @Input()
  customUpload
  @Input()
  showUploadButton
  @Input()
  showCancelButton
  @Input()
  dataUriPrefix
  @Input()
  deleteButtonLabel
  @Input()
  deleteButtonIcon = 'close'
  @Input()
  showUploadInfo
  /**
   *
   */
  @ViewChild('fileUpload', {static: false})
  fileUpload: ElementRef
  inputFileName: string
  @Input()
  files: File[] = []
  constructor(private sanitizer: DomSanitizer) {
  }
  onClick(event) {
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }
  onInput(event) {
    debugger
  }
  onFileSelected(event) {
    debugger
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    console.log('event::::::', event)
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (this.validate(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
        if (!this.isMultiple()) {
          this.files = []
        }
        this.files.push(files[i]);
      }
    }
  }
  removeFile(event, file) {
    let ix
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.files.splice(ix, 1)
      this.clearInputElement()
    }
  }
  validate(file: File) {
    for (const f of this.files) {
      if (f.name === file.name
        && f.lastModified === file.lastModified
        && f.size === f.size
        && f.type === f.type
      ) {
        return false
      }
    }
    return true
  }
  clearInputElement() {
    this.fileUpload.nativeElement.value = ''
  }
  isMultiple(): boolean {
    return this.multiple
  }
}
