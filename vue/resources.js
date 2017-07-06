Vue.http.options.root = 'http://127.0.0.1:8001/api';

window.BillPay = Vue.resource('pay/bills{/id}', {}, {
    total: { method: 'GET', url: 'pay/bills/total'}
});

window.BillReceive = Vue.resource('receive/bills{/id}', {}, {
    total: { method: 'GET', url: 'receive/bills/total'}
});