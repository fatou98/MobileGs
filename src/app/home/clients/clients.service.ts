import { Injectable } from '@angular/core';

import { Client } from './client.model';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// [
//   new Client(
//     'c1',
//     'assets/client-images/45675.jpg',
//     'Gueye',
//     'Mandiallo',
//     'Ouest Foire',
//     'madinho@example.com',
//     '772352235',
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
//     new Date(),
//     'abc'
//     ),
//     new Client(
//       'c2',
//       'assets/client-images/74503.jpg',
//       'Seck',
//       'Kader',
//       'Ouakam',
//       'niamin@example.com',
//       '772914578',
//       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
//       new Date(),
//       'abc'
//       )
//   ]

interface ClientData {
  imageUrl: string;
  nom: string;
  prenom: string;
  adresse: string;
  email: string;
  telephone: string;
  mesures: number[];
  createdAt: string;
  modifiedAt: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})

export class ClientsService {

  // tslint:disable-next-line: variable-name
  private _clients = new BehaviorSubject<Client[]> ([]);

  get clients() {
    return this._clients.asObservable();
  }

  constructor(private authService: AuthService,
              private http: HttpClient) { }

    fetchClients() {

      let fetchedUserId: string;
      return this.authService.userId.pipe(
        take(1),
        switchMap(userId => {
          if (!userId) {
            throw new Error('User not found!');
          }
          fetchedUserId = userId;
          console.log(fetchedUserId);
          return this.authService.token;
        }),
        take(1),
        switchMap(token => {
          return this.http
          .get<{[key: string]: ClientData}>(
            `https://gestionateliercouture.firebaseio.com/clients.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`
            );
          }),
          map(resData => {
            const clients = [];
            for (const key in resData) {
              if (resData.hasOwnProperty(key)) {
                clients.push(
                  new Client(
                    key,
                    resData[key].imageUrl,
                    resData[key].nom,
                    resData[key].prenom,
                    resData[key].adresse,
                    resData[key].email,
                    resData[key].telephone,
                    resData[key].mesures,
                    new Date(resData[key].createdAt),
                    new Date(resData[key].modifiedAt),
                    resData[key].userId
                    )
                    );
                  }
                }
            return clients;
              }),
              tap(clients => {
                this._clients.next(clients);
              })
              );
            }

            getClient(clientId: string) {
              return this.authService.token.pipe(
                take(1),
                switchMap(token => {
                  return this.http.get<ClientData>(
                    `https://gestionateliercouture.firebaseio.com/clients/${clientId}.json?auth=${token}`
                    );
                  }),
                  map(clientData => {
                    return new Client(clientId,
                      clientData.imageUrl,
                      clientData.nom,
                      clientData.prenom,
                      clientData.adresse,
                      clientData.email,
                      clientData.telephone,
                      clientData.mesures,
                      new Date(clientData.createdAt),
                      new Date(clientData.modifiedAt),
                      clientData.userId
                      );
                    })
                    );
                  }

                  uploadImage(image: File) {
                    const uploadData = new FormData();
                    uploadData.append('image', image);
                    return this.authService.token.pipe(
                      take(1),
                      switchMap(token => {
                        return this.http.post<{imageUrl: string, imagePath: string}>(
                          'https://us-central1-gestionateliercouture.cloudfunctions.net/storeImage',
                          uploadData,
                          { headers: { Authorization: 'Bearer ' + token } }
                          );
                        })
                        );
                      }


                      addClient(
                        imageUrl: string,
                        nom: string,
                        prenom: string,
                        adresse: string,
                        email: string,
                        telephone: string,
                        mesures: number[],
                        createdAt: Date,
                        modifiedAt: Date) {

                          let generatedId: string;
                          let newClient: Client;
                          let fetchedUserId: string;

                          return this.authService.userId.pipe(
                            take(1),
                            switchMap(userId => {
                              fetchedUserId = userId;
                              return this.authService.token;
                            }),
                            take(1),
                            switchMap(token => {
                              if (!fetchedUserId) {
                                throw new Error('No user id found!');
                              }
                              newClient = new Client(
                                Math.random().toString(),
                                imageUrl,
                                nom,
                                prenom,
                                adresse,
                                email,
                                telephone,
                                mesures,
                                createdAt,
                                modifiedAt,
                                fetchedUserId
                                );
                              return this.http
                                .post<{name: string}>(
                                  `https://gestionateliercouture.firebaseio.com/clients.json?auth=${token}`,
                                  { ...newClient,
                                    id: null});
                                  }),
                                  switchMap(resData => {
                                    generatedId = resData.name;
                                    return this.clients;
                                  }),
                                  take(1),
                                  tap(clients => {
                                    newClient.id = generatedId;
                                    this._clients.next(clients.concat(newClient));
                                  })
                                  );
                                }


                                updateClient(clientId: string,
                                             imageUrl: string,
                                             nom: string,
                                             prenom: string,
                                             adresse: string,
                                             email: string,
                                             telephone: string,
                                             mesures: number[],
                                  ) {
                                    let updatedClients: Client[];
                                    let fetchedToken: string;

                                    return this.authService.token
                                    .pipe(
                                      take(1),
                                      switchMap(token => {
                                        fetchedToken = token;
                                        return this.clients;
                                      }),
                                      take(1),
                                      switchMap(clients => {
                                        if (!clients || clients.length <= 0) {
                                          return this.fetchClients();
                                        } else {
                                          return of(clients);
                                        }
                                      }),
                                      switchMap(clients => {
                                        const updatedClientIndex = clients.findIndex(cl => cl.id === clientId);
                                        updatedClients = [...clients];
                                        const oldClient = updatedClients[updatedClientIndex];

                                        updatedClients[updatedClientIndex] = new Client(
                                          oldClient.id,
                                          imageUrl,
                                          nom,
                                          prenom,
                                          adresse,
                                          email,
                                          telephone,
                                          mesures,
                                          oldClient.createdAt,
                                          new Date(),
                                          oldClient.userId
                                          );
                                          // tslint:disable-next-line: max-line-length
                                        return this.http.put(`https://gestionateliercouture.firebaseio.com/clients/${clientId}.json?auth=${fetchedToken}`,
                                          { ...updatedClients[updatedClientIndex], id: null }
                                          );
                                        }),
                                        tap(() => {
                                          this._clients.next(updatedClients);
                                        })
                                        );
                                      }

                                      deleteClient(clientId: string) {
                                        return this.http
                                        .delete(
                                          `https://gestionateliercouture.firebaseio.com/clients/${clientId}.json`
                                          )
                                          .pipe(
                                            switchMap(() => {
                                              return this.clients;
                                            }),
                                            take(1),
                                            tap(clients => {
                                              this._clients.next(clients.filter(b => b.id !== clientId));
                                            })
                                            );
                                          }

                                        }


