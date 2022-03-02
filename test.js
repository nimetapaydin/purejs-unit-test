// TODO app
// todo input'u var
// todo button'u var
// input'a bir şey yazıp butona tıklayınca altta listelensin
import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom'

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

describe("Tüm testler", () => {
    let app
    let document
    let input
    let button

    function addTodo(text) {
        input.value = text;
        button.click();
    }

    function getTodos() {
        const liste = document.getElementById("todo-list");

        var listedizisi  = []; 
        for (let listItem of liste.children) {
           listedizisi.push(listItem.innerHTML);
        }
        return listedizisi;
    }

    beforeEach(() => {
        app = new JSDOM(html, { runScripts: 'dangerously' })
        document = app.window.document;
        input = document.getElementById("todo-input");
        button = document.getElementById('add-button');
    })

    test("todo butonu var olmalıdır", () => {    
        expect(button).not.toBeNull()
    });
    
    test("todo inputu var olmalıdır", () => {
        expect(input).not.toBeNull();
        expect(input.getAttribute('placeholder')).toEqual("Todo giriniz");
    })

    test("todo eklenice listede göreyim", async() => {
        addTodo("Yeni Todo");

        const liste = document.getElementById("todo-list").innerHTML;

        expect(liste.includes("Yeni Todo")).toBeTruthy();
    })

    test("isim boş olduğunda butona tıklarsam boş eleman eklemesin", () => {
        addTodo("");

        const liste = document.getElementById("todo-list");
        for (let listItem of liste.children) {
            expect(listItem.innerHTML).not.toEqual("");
        }
    })

    test("isim sadece boşluk içerirse eklememelidir", () => {
        addTodo("  ");

        const liste = document.getElementById("todo-list");
        for (let listItem of liste.children) {
            expect(listItem.innerHTML.trim()).not.toEqual("");
        }
    })

    test("todo eklendiğinde input temizlenmelidir", () =>{
        addTodo("Yeni Todo");

        expect(input.value).toEqual("");
    })

    test("aynı todo tekrar eklenmemeli", () => {
        addTodo("Yeni Todo");
        addTodo("Yeni Todo");

        const todos = getTodos();
        expect(todos.length).toEqual(1)
        expect(todos).toEqual(["Yeni Todo"]);
    })
})  
