import {Training} from './training.model';
import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {UIService} from '../Shared/services/ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  trainingsChanged = new Subject<Training[]>();
  currentTrainings: Training[] = [];
  runningTraining: Training;
  trainingChanged = new Subject<Training>();
  trainingsChange = new Subject<Training[]>();

  firebaseSubscriptions: Subscription[] = [];

  constructor(private firestore: AngularFirestore,
              private uiService: UIService) {
  }

  fetchTrainings() {
    this.firebaseSubscriptions.push(this.firestore.collection('availableTrainings').snapshotChanges()
      .pipe(map(payLoad => {
        return payLoad.map(data => {
          return {
            id: data.payload.doc.id,
            name: data.payload.doc.get('name'),
            calories: data.payload.doc.get('calories'),
            duration: data.payload.doc.get('duration'),
          };
        });
      })).subscribe(trainings => {
        this.currentTrainings = trainings;
        this.trainingsChanged.next([...this.currentTrainings]);
    }, error => {
        this.uiService.showSnackbar('Fetching available trainings failed', null, 3000);
      }));
  }

  startTraining(selectedId: string) {
    this.runningTraining = this.currentTrainings.find(training => {
      return training.id === selectedId;
    });
    this.trainingChanged.next({...this.runningTraining});
  }

  getCurrentTraining() {
    return {...this.runningTraining};
  }

  completeTaining() {
    this.addDataToDatabase({...this.runningTraining, date: new Date(), state: 'completed'});
    this.runningTraining = null;
    this.trainingChanged.next(null);
    this.uiService.showSnackbar('Training Completed', null, 3000);
  }
  abortTraining(progress: number) {
    this.addDataToDatabase({...this.runningTraining,
      duration: this.runningTraining.duration * (progress / 100),
      calories: this.runningTraining.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'});
    this.runningTraining = null;
    this.trainingChanged.next(null);
    this.uiService.showSnackbar('Training Aborted', null, 3000);
  }
  getCompletedOrCancelledTrainings() {
    this.firebaseSubscriptions.push(this.firestore.collection('finishedTrainings').snapshotChanges()
      .pipe(map(res => {
        return res.map(data => {
          return {
            id: data.payload.doc.id,
            name: data.payload.doc.get('name'),
            calories: data.payload.doc.get('calories'),
            duration: data.payload.doc.get('duration'),
            date: data.payload.doc.get('date').toDate(),
            state: data.payload.doc.get('state')
          };
        });
      }))
      .subscribe(trainings => {
      this.trainingsChange.next(trainings);
    }, error => {
        this.uiService.showSnackbar('Fetching completed or aborted trainings failed', null, 3000);
      }));
  }
  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach(sub => sub.unsubscribe());
  }
  private addDataToDatabase(training: Training) {
    this.firestore.collection('finishedTrainings')
      .add(training)
      .catch(error => {
        this.uiService.showSnackbar('Failed to save data', null, 3000);
      });
  }
}
