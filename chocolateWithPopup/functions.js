function openPopup(num) {
    document.getElementById(`basic_dropdown${num}`).classList.toggle('show');
}

window.onclick = function (event) {
    if (!event.target.matches('.popup')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}