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

    beforeEach(() => {
        app = new JSDOM(html, { runScripts: 'dangerously' })
        document = app.window.document;
    })

    test("todo butonu var olmalıdır", () => {    
        const element = document.getElementById('add-button');
        expect(element).not.toBeNull()
    });
    
    test("todo inputu var olmalıdır", () => {
        const input = document.getElementById("todo-input");
        expect(input).not.toBeNull();
        expect(input.getAttribute('placeholder')).toBe("Todo giriniz");
    })

    test("todo eklenice listede göreyim", async() => {
        const input = document.getElementById("todo-input");
        const button = document.getElementById('add-button');
        input.value = "Yeni Todo";
        button.click();

        const liste = document.getElementById("todo-list").innerHTML;

        expect(liste.includes("Yeni Todo")).toBeTruthy();
    })

    test("isim boş olduğunda butona tıklarsam boş eleman eklemesin", () => {
        const input = document.getElementById("todo-input");
        const button = document.getElementById('add-button');
        input.value = "";
        button.click();

        const liste = document.getElementById("todo-list");
        for (let listItem of liste.children) {
            expect(listItem.innerHTML).not.toBe("");
        }
    })

    test("isim sadece boşluk içerisrse eklememelidir", () => {
        const input = document.getElementById("todo-input");
        const button = document.getElementById('add-button');
        input.value = "  ";
        button.click();

        const liste = document.getElementById("todo-list");
        for (let listItem of liste.children) {
            expect(listItem.innerHTML.trim()).not.toBe("");
        }
    })
})