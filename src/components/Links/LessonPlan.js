import React from "react";
import plan from "../../img/plan.PNG";

export default function LessonPlan() {
  return (
    <div className="plan">
      <div className="col s12">
        <img src={plan} className="responsive-img plan-img" alt="Plan lekcji" />
      </div>
    </div>
  );
}
