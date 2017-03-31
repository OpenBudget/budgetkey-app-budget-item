import { Component } from '@angular/core';

@Component({
  selector: 'budgetkey-item-intro',
  styles: [`
  .intro {
  }
  `],
  template: `
      <h1>
      תחום פעולה במשרד השיכון הכולל 9 תכניות.
      רוב התקציב יוצא דרך רכש של ציוד ושירותים, לרוב בפטור ממכרז.
      המובילים בתקצוב מתחום פעולה זה הן חברות עמידר, וחלמיש.
      מתחילת 2015, 12 העברות הגדילו את התקציב לכדי 367%⬆ מסכומו המקורי (210,727,000 ₪).
ב4 השנים האחרונות באופן קבוע, סעיף זה גדל בהעברות עד לכדי פי 3 מתקציבו המקורי.
השנה התקציב התנפח יותר מבדרך כלל הן ביחס לתקציב המקורי והן ביחס לשנים קודמות.
      </h1>
  `,
})
export class BudgetKeyIntro {
  id = 1;
}
