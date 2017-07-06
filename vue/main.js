var router = new VueRouter();
/*
var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: '<bill-component></bill-component>',
    data: function () {
        return {
            billsPay: [
                {date_due: '20/08/2016', name: 'Conta de Luz', value: 70.99, done: false},
                {date_due: '21/08/2016', name: 'Conta de água', value: 55.99, done: false},
                {date_due: '22/08/2016', name: 'Conta de Telefone', value: 55.99, done: false},
                {date_due: '23/08/2016', name: 'Supermercado', value: 624.99, done: false},
                {date_due: '24/08/2016', name: 'Cartão de Crédito', value: 1500.99, done: false},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 2000.99, done: false},
                {date_due: '26/08/2016', name: 'Gasolina', value: 200, done: false}
            ],
            billsReceive: [
                {date_due: '20/08/2016', name: 'FreeLancer', value: 1599.99, done: false},
                {date_due: '21/08/2016', name: 'Emprego', value: 2000, done: false}
            ]
        };
    }
});
*/
router.map({
    '/': {
        name: 'dashboard',
        component: dashboardComponent
    },
    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:id/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            },
        }
    },
    '/bill-receives':{
        name: 'bill-receive',
        component: billReceiveComponent,
        subRoutes:{
            '/': {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },
            '/:id/update': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            },
        }
    },
    '*': {
        component: billPayListComponent
    }

});

router.start({
    components: {
        'bill-component': billComponent
    }
}, "#app");


 router.redirect({
 '*': '/bill-pays'
 });
