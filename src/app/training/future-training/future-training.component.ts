import {Component, OnInit, OnDestroy} from '@angular/core';
import {TrainingService} from '../training.service';
import {Training} from '../training.model';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-future-training',
  templateUrl: './future-training.component.html',
  styleUrls: ['./future-training.component.scss']
})
export class FutureTrainingComponent implements OnInit, OnDestroy {

  trainings: Training[];
  trainingSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.fetchTrainings();
    this.trainingSubscription = this.trainingService.trainingsChanged.subscribe(trainings => {
      this.trainings = trainings;
    });
  }

  onStartTraining(formData: NgForm) {
    this.trainingService.startTraining(formData.value.training);
  }

  ngOnDestroy(): void {
    this.trainingSubscription.unsubscribe();
  }

}
