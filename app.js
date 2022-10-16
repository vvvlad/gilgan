const app = Vue.createApp({
  data() {
    return {
      kidBirthday: null,
      kidBirthdayDate: null,
      hovaSchoolDateString: null,
      kidAgeHova: null,
      displayResults: false,
    };
  },
  // method that initiates birthday with current date
  created() {
    var birthDay = this.addYears(new Date(), -5);
    this.initMethod(birthDay);
  },
  methods: {
    initMethod(birthDay) {
      this.kidBirthday = this.getDateString(birthDay);
      this.kidBirthdayDate = birthDay;
    },
    calcHova() {
      this.initMethod(new Date(this.kidBirthday));
      // add 5 years to kids birthday to get hova year
      var hovaDate = this.addYears(this.kidBirthdayDate, 5);

      // generate start of the relevant hova school year
      var hovaSchoolDate = this.genFirstSept(hovaDate);
      this.kidAgeHova = this.ageAtYearStart(
        hovaSchoolDate,
        this.kidBirthdayDate
      );
      this.displayResults = true;
      this.hovaSchoolDateString = this.getDateStringDisplay(hovaSchoolDate);
    },
    hideResults() {
      this.displayResults = false
    },
    ageAtYearStart(schoolDate, birthDate) {
      var diffDate = new Date(schoolDate - birthDate);
      var years = diffDate.toISOString().slice(0, 4) - 1970;
      var months = diffDate.getMonth();
      if (months == 0) {
        return years + " שנים בדיוק";
      } else {
       return years + " שנים ו- " + months + " חודשים ";
      }
    },
    getDateString(date) {
      function pad(n) {
        return n < 10 ? "0" + n : n;
      }
      var result =
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate());
      return result;
    },
    getDateStringDisplay(date) {
      function pad(n) {
        return n < 10 ? "0" + n : n;
      }
      var result =
        pad(date.getDate()) +
        "/" +
        pad(date.getMonth() + 1) +
        "/" +
        date.getFullYear();
      return result;
    },
    addYears(date, yearsToAdd) {
      const dateCopy = new Date(date);
      dateCopy.setFullYear(date.getFullYear() + yearsToAdd);
      return dateCopy;
    },
    genFirstSept(date) {
      const dateCopy = date;
      dateCopy.setMonth(8);
      dateCopy.setDate(1);
      return dateCopy;
    },
  },
});

app.mount("#vue-section");
