import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { WorkspaceComponent } from "./workspace/workspace.component";
import { ModalAdviseResultComponent } from "./modal-advise-result/modal-advise-result.component";
import { ContentTematicComponent } from "./content-tematic/content-tematic.component";
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    WorkspaceComponent,
    ContentTematicComponent,
    ModalAdviseResultComponent
  ],
  exports: [
    WorkspaceComponent,
    ContentTematicComponent,
    ModalAdviseResultComponent
  ],
  entryComponents: [
    WorkspaceComponent,
    ContentTematicComponent,
    ModalAdviseResultComponent
  ]
})
export class ComponentsModule { }
