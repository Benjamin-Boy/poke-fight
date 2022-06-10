// Get all elements with class="tablinks"
const tablinks = document.querySelectorAll(".tablinks");

// Show default panel
const tabContent = document.querySelector("#manageUsers");
tabContent.style.display = "block";

// Show the current tab, and add an "active" class to the button that opened the tab
tablinks.forEach(tablink => {
  tablink.addEventListener('click', (e) => {
    const tabcontents = document.querySelectorAll(".tabcontent");

    tabcontents.forEach(tabContent => {
      tabContent.style.display = "none";

      if(e.currentTarget.classList.contains(tabContent.getAttribute('id'))){
        tabContent.style.display = "block";
      }
    })
    
    tablinks.forEach(tablink => {
      tablink.classList.remove('active');
    })

    e.currentTarget.classList.add('active');
  })
})

