import {Component, OnInit} from '@angular/core';
import { ConfirmationDialogComponent } from '../../Shared/compoenents/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {TrainingService} from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(public dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.startProgressTimer();
  }

  startProgressTimer() {
    const step = this.trainingService.getCurrentTraining().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.trainingService.completeTaining();
      }
    }, step);
  }

  cancelTraining() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {progress: this.progress}});
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.trainingService.abortTraining(this.progress);
      } else {
        this.startProgressTimer();
      }
    });
  }

}
