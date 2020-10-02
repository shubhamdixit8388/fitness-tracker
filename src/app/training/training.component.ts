import {Component, OnInit} from '@angular/core';
import {TrainingService} from './training.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  onGoingTraining = false;
  changedSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.changedSubscription = this.trainingService.trainingChanged.subscribe( training => {
      this.onGoingTraining = !!training;
    });
  }
}
