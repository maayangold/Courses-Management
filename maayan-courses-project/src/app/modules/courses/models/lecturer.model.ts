import { EmailValidator } from "@angular/forms";
export class Lecturer {
    static Counter: number = 0;
    id: number;
    name?: string;
    address?: string;
    email?: string;
    password?: string;
    constructor(name: string = '', address: string = '', email: string = '', password: string = '') {
        this.id = ++Lecturer.Counter;
        this.name = name;
        this.address = address;
        this.email = email;
        this, password = password;
    }
}
