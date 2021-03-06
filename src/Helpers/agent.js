import React from 'react';

import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

import history from '../Base/history';

//
// var Firebase = require('firebase');
//
// Firebase.initializeApp({
//     apiKey: "AIzaSyDx-jT5hlj-zpQvJxt9qMDwOVla-pm-iX4",
//     authDomain: "ip-gifty-staging.firebaseapp.com",
//     databaseURL: "https://ip-gifty-staging.firebaseio.com",
//     projectId: "ip-gifty-staging",
//     storageBucket: "ip-gifty-staging.appspot.com",
//     messagingSenderId: "965307490561"
// });
//
// var authService = Firebase.auth();
// var database = Firebase.database();

let token = null;



const Auth = {
    current: () => {
        return new Promise(function (resolve, reject) {
            authService.onAuthStateChanged(function (user) {
                if (user) {
                    resolve(user);
                } else {
                    history.push('/');
                    reject('There was an error bish');
                }
            })
        })
    },
    login: (email, password) => {
        return authService.signInWithEmailAndPassword(email, password);
    },
    register: (email, password) => {
        return authService.createUserWithEmailAndPassword(email, password);
    },
    assignConsole: (uid) => {
        return database.ref('users/' + uid).push();
    },
    lookupConsole: (uid) => {
        return database.ref('users/' + uid).once('value');
    },
    lookupConsole2: (uid) => {
        return dispatch => {
            var consoleWatch = database.ref('users/' + uid);
            consoleWatch.on('value', function (snapshot) {
                /*
                 console.log(snapshot.val());
                 */

                dispatch(FirebaseQuery.fetchConsole(snapshot.val()))
            });
        }
    },
    logout: () => {
        authService.signOut();
    }
};

const FirebaseWatcher = {
    links: (id) => {
        return dispatch => {
            var linkWatcher = database.ref('api/v1/responses/' + id);
            linkWatcher.on('value', function (snapshot) {

                if (snapshot.val()) {
                    toast(<div>{snapshot.val().gifty}</div>);
                }
                dispatch({type: 'LINK', link: 'https://gifty.link/' + id});
            });
            linkWatcher.off();
        }
    },
    chartDataWatcher: (campaign) => {
        return database.ref('stats/stats_by_campaign/' + campaign)
    },
    campaignWatcher: (console_id) => {
        return database.ref('consoles/' + console_id + '/campaigns')
    }

}

const FirebaseQuery = {
    aggregateData: (chartData, stats) => {
        console.log('AGGREGATE_DATA_FROM_ALL_CHARTS');
        return dispatch => {
            var aggregateChartData = aggregator(chartData, stats);

            dispatch({
                type: 'AGGREGATE_CHART_DATA',
                aggregateChartData: aggregateChartData[0],
                gross: aggregateChartData[1],
                redeemed: aggregateChartData[2],
                newCustomers: aggregateChartData[3],
                total: aggregateChartData[4],
                percentChange: aggregateChartData[5],

                /*This is used to ensure that the initial <LoadScreen> is shown in HomeDash.js*/
                loaderDisplay: false
            });
        }

    },
    campaignMeta: (campaign) => {
        return dispatch => {
            console.log('campaignMeta called');
            database.ref('campaigns/' + campaign).on('value', (snapshot) => {
                if (snapshot.val() !== null) {
                    dispatch({
                        type: 'CAMPAIGN_META',
                        campaign: campaign,
                        campaignMeta: snapshot.val()
                    })
                }

                return (snapshot.val());
            });
        }
    },
    fetchConsole: (console_id) => {
        console.log('FETCH_CONSOLE');
        return dispatch => {
            database.ref('consoles/' + console_id).on('value', function (snapshot) {
                if (snapshot.val()) {
                    dispatch({type: 'CONSOLE_DATA', consoleData: snapshot.val()});
                } else {
                    dispatch({
                        type: 'CONSOLE_DATA', consoleData: {
                            "active_campaigns": {
                                campaign: null
                            },
                            "agreements": {
                                "-KmMclctWZDKexyM_9Xo": {
                                    "active": true,
                                    "owner": "Default"
                                }
                            },
                            "name": "Default",
                            "campaigns": {
                                campaign: null
                            },
                            "giftys": {
                                "": {
                                    "city": "",
                                    "keyword": "",
                                    "lang": {
                                        "gift": "",
                                        "gift_from": "",
                                        "gift_short": "",
                                        "how_to_redeem": ""
                                    },
                                    description: "",
                                    "price": {
                                        "display": "",
                                        "stripe": {
                                            "all_fees_pct": null,
                                            "application_fee": null,
                                            "cents": null,
                                            "currency": null,
                                            "stripe_fee": null
                                        }
                                    },
                                    "console_id": "Default"
                                }
                            },
                            "notifications": {
                                "uid": {
                                    message: null
                                }
                            },
                            "payment": {
                                "balance": {
                                    "cad": {
                                        "cents": null
                                    }
                                }
                            },
                            "console_id": "Default"
                        }
                    })
                }

            })
        }
    },
    updateChartData: (campaign, filter, startDate, endDate) => {
        console.log('UPDATE_CHART');
        console.log(campaign);

        return dispatch => {

            if (endDate == null || startDate == null) {
                dispatch({
                    type: 'DATE_FILTER',
                    filter: -1,
                    startDate: startDate,
                    endDate: endDate
                })
            } else if (filter == null) {
                database.ref('stats/stats_by_campaign/' + campaign).orderByKey().startAt(startDate.unix().toString()).endAt(endDate.unix().toString()).once('value', function (snapshot) {
                    console.log(snapshot.val());
                    console.log(startDate);
                    var chartData;


                    if(snapshot.val() === null) {
                        /*This is used for creating dummy data when there is:
                         * a) A new registrant
                         * b) When there is no *_public information compiled yet.
                         *Not very efficient? I agree. Hax0r
                         **/

                        chartData = flattener({[startDate.clone().unix()] : {created: 0, gross: 0, new: 0, redeemed: 0}}, startDate.clone(), endDate.clone());
                        console.log(chartData);

                    } else {

                        chartData = flattener(snapshot.val(), startDate.clone(), endDate.clone());
                    }

                    console.log(chartData);
                    console.log(campaign);
                    dispatch({
                        type: 'CHART_DATA',
                        campaign: campaign,
                        chartData: chartData[0],
                        gross: chartData[1],
                        redeemed: chartData[2],
                        newCustomers: chartData[3],
                        total: chartData[4],
                        percentChange: chartData[5]
                    });
                })
            } else {
                database.ref('stats/stats_by_campaign/' + campaign).orderByKey().startAt(startDate.unix().toString()).endAt(endDate.unix().toString()).once('value', function (snapshot) {
                    console.log(snapshot.val());
                    var chartData = flattener(snapshot.val(), startDate, endDate);

                    dispatch({
                        type: 'UPDATE_CHART_DATA',
                        campaign: campaign,
                        chartData: chartData[0],
                        gross: chartData[1],
                        redeemed: chartData[2],
                        newCustomers: chartData[3],
                        total: chartData[4],
                        percentChange: chartData[5],
                        filter: filter,
                        startDate: startDate.clone(),
                        endDate: endDate.clone()
                    });
                })
            }

        }
    },
    updateGifty: (key1, dashboard, editGifty) => {
        return dispatch => {
            var Gifty = database.ref('consoles/' + dashboard + '/giftys/' + key1);
            Gifty.set(editGifty);
            Gifty.off();
            dispatch({
                type: 'MODAL_TOGGLE',
                value: 'close'
            })
        }
    },
    updateTransactionInfo: (id, gift, startDate, endDate) => {
        return dispatch => {

            /*If there is no gift, then grab all transaction History*/
            if (gift === 'all') {
                database.ref('transactions/' + id).orderByChild("timestamp").startAt(startDate.unix()).endAt(endDate.unix()).once("value", function (snapshot) {
                    if (snapshot.val() === null) {
                        dispatch({
                            type: 'UPDATE_TRANSACTIONS',
                            transactions: {}
                        });
                    } else {
                        dispatch({
                            type: 'UPDATE_TRANSACTIONS',
                            transactions: snapshot.val()
                        });
                    }
                })
            } else {
                database.ref('transactions/' + id).limitToLast(50).orderByChild("timestamp").startAt(startDate.unix()).endAt(endDate.unix()).once("value", function (snapshot) {
                    if (snapshot.val() === null) {
                        dispatch({
                            type: 'UPDATE_TRANSACTIONS',
                            transactions: {}
                        });
                    } else {
                        dispatch({
                            type: 'UPDATE_TRANSACTIONS',
                            transactions: snapshot.val()
                        });
                    }

                })
            }
        }
    },

    requestData: (searchTerm, campaign) => {
        return dispatch => {

            let newTerm = "*" + searchTerm + "*";
            let key = database.ref().child('search/request').push({
                index: 'firebase',
                type: 'offers',
                q: newTerm
            }).key;

            var searchResult = {};
            if (searchTerm === '') {
                dispatch({
                    type: 'CAMPAIGN_SEARCH',
                    key: key,
                    searchResult: {}
                })
            } else {

                database.ref('search/response/' + key + '/hits').on('value',
                    function (snapshot) {
                        if (snapshot.val()) {
                            searchResult = snapshot.val();

                            dispatch({
                                type: 'CAMPAIGN_SEARCH',
                                key: key,
                                campaign: campaign,
                                searchResult: searchResult.hits
                            })
                        }

                    });
            }
        }


    },
    consoleEndpoint: (key, type, dashboard, endpoint, bundle) => {
 /*       return dispatch=> {*/
            var newPostRef = database.ref('api/v1/requests').push();
            var id = newPostRef.key;
            var json = {};
            switch (type) {
                case 'create_console':
                    json = {
                        type: type,
                        bundle: bundle
                    }
                    console.log(json);
                    break;
                case 'link_create':
                    json = {
                        console_id: dashboard,
                        vendor: 'gravity_yyc',
                        type: type,
                        wait_for_response_at: id,
                        offer: key
                    };
                    break;
                case 'create_campaign':
                    json = {
                        console_id: dashboard,
                        type: type,
                        wait_for_response_at: id,
                        bundle: bundle
                    };
                    console.log(json);
                    break;
                case 'remove_user':
                    json = {
                        console_id: dashboard,
                        type: type,
                        wait_for_response_at: id,
                        name: bundle
                    }
                    break;
                case 'assign_default':
                    json = {
                        console_id: dashboard,
                        type: type,
                        wait_for_response_at: endpoint,
                        name: bundle
                    }
                    break;
            }
            newPostRef.set(json
            )/*.then(FirebaseWatcher.links(id))*/.then(
                /*
                 database.ref('api/v1/responses/' + id).set({gifty: key, link: id})
                 */
            ).then(
                /*   //This is only for the purposes of being able to mock and fake data
                 database.ref('stats/stats_by_campaign/-KmMclctWZDKexyM_9Xo/' + moment().unix()).set({
                 created: 1,
                 new: Math.floor(Math.random() * 2),
                 redeemed: Math.floor(Math.random() * 2),
                 gross: Math.round(Math.random() * 2 *100)/100
                 })*/
            );
            switch (type) {
                case 'link_create':
                {
                    var linkWatcher = database.ref('api/v1/responses/' + dashboard + '/' + id);
                    linkWatcher.on('value', function (snapshot) {
                        if (snapshot.val()) {
                            toast(<div>{snapshot.val().link}</div>);
/*
                            dispatch({type: 'LINK', link: 'https://gifty.link/' + snapshot.val().link, key: key});
*/
                        }
                    });
                }
            }
/*        }*/
    }
}


export default {
    Auth,
    FirebaseQuery,
    FirebaseWatcher,
    setToken: _token => {
        token = _token;
    },
    authService
};
