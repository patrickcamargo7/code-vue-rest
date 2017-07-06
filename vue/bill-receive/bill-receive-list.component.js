window.billReceiveListComponent = Vue.extend({
    template: `
        <style>
        .pago{
            color: green;
        }
        .nao-pago{
            color: red;
        }
        </style>
        <table border="1" cellpadding="10">
            <thead>
            <tr>
                <th>#</th>
                <th>Vencimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Recebido?</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index, bill) in bills">
                <td>{{ index + 1 }}</td>
                <td>{{ bill.date_due }}</td>
                <td>{{ bill.name }}</td>
                <td>{{ bill.value | currency 'R$ ' 2 }}</td>
                <td class="minha-classe" :class="{'pago': bill.done, 'nao-pago': !bill.done}">
                    {{ bill.done | doneLabel }}
                </td>
                <td>
                    <a v-link="{ name: 'bill-receive.update', params: { id: bill.id } }">Editar</a> |
                    <a href="#" @click.prevent="deleteBill(bill)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,
    data: function () {
        return {
            bills: []
        }
    },
    created: function () {
        var self = this;
        BillReceive.query().then(function(response){
            self.bills = response.data;
        });
    },
    methods: {
        deleteBill: function (bill) {
            if(confirm('Deseja excluir esta conta?')) {
                var self = this;
                BillReceive.delete({id: bill.id}).then(function(response){
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});