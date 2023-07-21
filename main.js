//JSON.stringy(x) x değişkini JSON modeline dönüştürür
//JSON.parse(x) x değişkini JAVASCRİPT OBJE modeline dönüştürür

let students = [];

// Öğrenci bilgilerini local storage'da var ise alma
let isThereLocal = localStorage.getItem("students");
console.log("isThereLocal", isThereLocal);

if (isThereLocal) {//localStorage da kayıtlı ise

    students = JSON.parse(localStorage.getItem("students"));

} else {//localStorage da kayıtlı değilse
    students = [];
}


// Öğrenci bilgilerini localstorage tutulması
function saveLocalStorge() {
    localStorage.setItem("students", JSON.stringify(students));
}


// Öğrenci formunu seçme
const studentForm = document.querySelector("#student-form");


const studentList = document.querySelector("#student-list");

const addButton = document.querySelector(".add");


studentForm.addEventListener("submit", (e) => {
    //form ile submit değildiğinde sayfa yenilendiği için yenilemeyi iptal eder
    e.preventDefault();
    console.log("eklendi.")

    // Form elemanlarının seçilmesi
    const name = document.querySelector("#name").value;
    const surname = document.querySelector("#surname").value;
    const number = document.querySelector("#number").value;
    const midterm = document.querySelector("#midterm").value;
    const final = document.querySelector("#final").value;

    const newStudent = {
        name: name,
        surname: surname,
        number: number,
        midterm: midterm,
        final: final
    }

    students.push(newStudent);

    console.log("Sonuç:", newStudent);

    studentForm.reset();
    saveLocalStorge()
    console.log("students:", students);
})

viewStudent();

function viewStudent() {
    const emptyList = document.querySelector(".empty");

    if (students.length) {
        console.log("dolu")

        students.forEach((currentValue, index) => {
            const studentCard =
                ` 
            <div class="student-item-info">
                <h3>${currentValue.name} ${currentValue.surname} - ${currentValue.number}</h3>
                <span>Vize: ${currentValue.midterm} Final: ${currentValue.final}</span>
                <p>Ortalama: ${((Number(currentValue.midterm) + Number(currentValue.final)) / 2).toFixed(2)}</p>
            </div>
            <div class="student-item-process">
                <i class="fa-solid fa-pen-to-square edit-button"></i>
                <i class="fa-solid fa-trash delete-button"></i>
            </div>
      
            `;

            // öğrenci bilgisini içeren eleman oluşturma student-item classı
            const studentItem=document.createElement("div");//create element ile bir div oluştturma
            studentItem.classList.add("student-item");//studentItem divine class ekleme
            studentItem.innerHTML=studentCard;
            console.log("studentList",studentList);


            
      const average = ((Number(currentValue.midterm) + Number(currentValue.final)) / 2).toFixed(2);
      
      if (average > 80) {
        // console.log('80 den buyuk',ortalama)
        studentItem.style.background = "#15aefe";
      } else if (average > 60) {
        // console.log('60 den buyuk',ortalama)
        studentItem.style.background = "#f47121";
      } else if (average > 45) {
        // console.log('45 den buyuk',ortalama)
        studentItem.style.background = "#630eff";
      } else {
        // console.log('45 den küçük',ortalama)
        studentItem.style.background = "#ff0fe4";
        /* studenItem.cssText= `
          background:red;
          border:yellow 2px solid;
            ` */
      }
            // öğrenci elemanını listeye ekleme
            studentList.appendChild(studentItem);



        });

    } else {
        console.log("boş");

        const forEmpty = `
        <p class="empty">Listenizde öğrenci bulunmamaktadır.</p>`;

        studentList.innerHTML = forEmpty;
        console.log(studentList.innerHTML);
    }
}


