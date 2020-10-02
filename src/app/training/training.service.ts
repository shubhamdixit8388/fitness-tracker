import {Training} from './training.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  // availableTrainings = new Subject<Training[]>();
  currentTrainings: Training[] = [
    { id: 'crunches', name: 'Crunches', duration: 10, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  runningTraining: Training;
  trainingChanged = new Subject<Training>();
  trainings: Training[] = [];

  getTrainings() {
    return this.currentTrainings.slice();
  }

  startTraining(selectedId: string) {
    this.runningTraining = this.currentTrainings.find(training => training.id === selectedId);
    this.trainingChanged.next({...this.runningTraining});
  }

  getCurrentTraining() {
    return {...this.runningTraining};
  }

  completeTaining() {
    this.trainings.push({...this.runningTraining, date: new Date(), state: 'completed'});
    this.runningTraining = null;
    this.trainingChanged.next(null);
  }
  abortTraining(progress: number) {
    this.trainings.push({...this.runningTraining,
      duration: this.runningTraining.duration * (progress / 100),
      calories: this.runningTraining.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'});
    this.runningTraining = null;
    this.trainingChanged.next(null);
  }
  getCompletedOrCancelledTrainings() {
    return this.trainings.slice();
  }
}
