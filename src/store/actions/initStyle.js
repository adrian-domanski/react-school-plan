import M from "materialize-css";
import $ from "jquery";

export const initStyle = (option, close) => {
  if (option !== "modal" && document.querySelector(".datepicker")) {
    $("#group_picker").on("change", e => {
      $(".select-wrapper input.select-dropdown").addClass("select-active");
    });

    var elems = document.querySelectorAll(".datepicker");
    var instances = M.Datepicker.init(elems, {
      format: "dd/mm/yyyy",
      i18n: {
        months: [
          "Styczeń",
          "Luty",
          "Marzec",
          "Kwiecień",
          "Maj",
          "Czerwiec",
          "Lipiec",
          "Sierpień",
          "Wrzesień",
          "Październik",
          "Listopad",
          "Grudzień"
        ],
        monthsShort: [
          "Sty",
          "Lut",
          "Marz",
          "Kwie",
          "Maj",
          "Czer",
          "Lip",
          "Sier",
          "Wrze",
          "Paź",
          "List",
          "Gru"
        ],
        weekdays: [
          "Niedziela",
          "Poniedziałek",
          "Wtorek",
          "Środa",
          "Czwartek",
          "Piątek",
          "Sobota"
        ],
        weekdaysShort: ["Niedz", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"],
        weekdaysAbbrev: ["N", "P", "W", "Ś", "C", "P", "S"],
        cancel: "Anuluj",
        clear: "Wyczyść",
        done: "DALEJ"
      }
    });
  }
  if (
    option !== "nav" &&
    option !== "modal" &&
    document.querySelector(".datepicker")
  ) {
    document.querySelector(".datepicker").addEventListener("focus", () => {
      instances[0].open();
    });
  }

  if (
    option === "nav" &&
    option !== "modal" &&
    document.querySelector(".sidenav")
  ) {
    let mobile = document.querySelectorAll(".sidenav");
    M.Sidenav.init(mobile);
  }

  if (option !== "modal" && document.querySelector("select")) {
    let elems_select = document.querySelectorAll("select");
    M.FormSelect.init(elems_select);
  }

  if (option === "modal" && document.querySelector(".modal")) {
    var modals = document.querySelectorAll(".modal");
    var inst_modal = M.Modal.init(modals);
    // console.log(inst_modal);
    return inst_modal;
  }

  if (
    option === "nav" &&
    option !== "modal" &&
    document.querySelector(".sidenav")
  ) {
    let sideNavs = document.querySelectorAll(".sidenav");
    let inst_side = M.Sidenav.init(sideNavs);
    return inst_side;
  }

  if (option === "dropdown" && document.querySelector(".sidenav")) {
    let dropdowns = document.querySelectorAll(".dropdown-trigger");
    let inst_drop = M.Dropdown.init(dropdowns);
    console.log(inst_drop);
    return inst_drop;
  }
};
