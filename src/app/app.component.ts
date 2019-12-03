import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   component: string = 'recipes';

   onCatchNavigate(component) {
      this.component = component;
   }
}
