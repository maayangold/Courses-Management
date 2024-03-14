import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { User } from "src/app/modules/users/models/user.model"

@Injectable()
export class UserService {
    getUsers(): Observable<User[]> {
        return this._http.get<User[]>("/api/Users")
    }
    getUserById(id: number): Observable<User> {
        return this._http.get<User>("/api/Users/" + id);
    }
    getUsersByName(name: string): Observable<User[]> {
        if (name === '')
            return this.getUsers()
        return this._http.get<User[]>("api/Users/?name=" + name)
    }
    saveUserToServer(UserList: User): Observable<boolean> {
        return this._http.post<boolean>("/api/Users", UserList)
    }
    
    constructor(private _http: HttpClient) {
        //  http://localhost:51028/api/Users
    }
}