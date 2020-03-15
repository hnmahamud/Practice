const fire = () => {
    const mainTitle = document.getElementById('main-title');
    mainTitle.textContent = 'Some new text!';
    mainTitle.style.color = 'white';
    mainTitle.style.backgroundColor = 'black';

    const lastItem = document.querySelector('li:last-of-type');
    lastItem.textContent = lastItem.textContent + ' Changed!';
};

const click = document.getElementById('click');
click.addEventListener("click", fire);

const allListItems = document.getElementsByTagName('li');
for (const list of allListItems) {
    console.dir(list);
}