import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private firestore: AngularFirestore) {
  }
  ngOnInit(): void {
    this.firestore.collection('availableTrainings').valueChanges().subscribe(result => {
      console.log('result: ', result);
    });
  }
}

