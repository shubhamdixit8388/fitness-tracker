import {Component, OnInit, OnDestroy} from '@angular/core';
import {TrainingService} from '../training.service';
import {Training} from '../training.model';
import {Observable, Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-future-training',
  templateUrl: './future-training.component.html',
  styleUrls: ['./future-training.component.scss']
})
export class FutureTrainingComponent implements OnInit, OnDestroy {

  trainings: Observable<any[]>;
  // trainingSubscription: Subscription;

  constructor(private trainingService: TrainingService,
              private firestore: AngularFirestore) { }

  ngOnInit(): void {
    /*this.trainingSubscription = this.trainingService.availableTrainings.subscribe( availableTrainings => {
      this.trainings = availableTrainings;
    });*/
    // this.trainings = this.trainingService.getTrainings();
    this.trainings = this.firestore.collection('availableTrainings').valueChanges();
  }

  onStartTraining(formData: NgForm) {
    this.trainingService.startTraining(formData.value.training);
    console.log('formData.value.training: ', formData.value.training);
  }

  ngOnDestroy(): void {
    // this.trainingSubscription.unsubscribe();
  }

}
