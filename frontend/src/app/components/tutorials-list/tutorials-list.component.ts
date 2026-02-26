import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  isLoading = true;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.isLoading = true;
    this.tutorialService.getAll()
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          console.log(data);
          // Small simulated delay for demonstrating the new premium loading spinner UX
          setTimeout(() => this.isLoading = false, 400);
        },
        error: (e) => {
          console.error(e);
          this.isLoading = false;
        }
      });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    Swal.fire({
      title: 'Are you absolutely sure?',
      text: "This will delete ALL tutorials from the database!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete EVERYTHING!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tutorialService.deleteAll()
          .subscribe({
            next: (res) => {
              console.log(res);
              this.refreshList();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'All tutorials deleted',
                showConfirmButton: false,
                timer: 1500,
                toast: true
              });
            },
            error: (e) => console.error(e)
          });
      }
    });
  }

  searchTitle(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;
    this.isLoading = true;

    this.tutorialService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          console.log(data);
          setTimeout(() => this.isLoading = false, 400);
        },
        error: (e) => {
          console.error(e);
          this.isLoading = false;
        }
      });
  }

}