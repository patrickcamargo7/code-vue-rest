window.dashboardComponent = Vue.extend({
    /*components: {
        'menu-component': billPayMenuComponent
    },
    */
    template: `
    <style>
        .minha-classe{
            background-color: burlywood;
        }
        .red{
            color: red;
        }
        .green{
            color: green;
        }
        .gray{
            color: gray;
        }
    </style>

    <h1>{{ title }}</h1>
    
    <!--
    <h3>Contas a pagar: {{ sumPayBills | currency 'R$ ' 2 }}</h3>
    <h3>Contas a receber: {{ sumReceivedBills | currency 'R$ ' 2 }}</h3>
    <h3 :class="{'green': sumReceivedBills - sumPayBills >= 0, 'red': sumReceivedBills - sumPayBills < 0}">Total: {{ sumReceivedBills - sumPayBills | currency 'R$ ' 2 }}</h3>
    !-->

    <!--<h3 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0 }">{{ status | statusGeneral }}</h3>!
    
    <menu-component></menu-component>
    <router-view></router-view> 
    !-->
    `,
    data: function() {
        return {
            title: "Dashboard"
        }
    },
    computed: {
        sumPayBills: function(){
            var sum = 0;
            this.$root.$children[0].billsPay.forEach(function(bill){
                sum += bill.value;
            });
            return sum;
        },
        sumReceivedBills: function(){
            var sum = 0;
            this.$root.$children[0].billsReceive.forEach(function(bill){
                sum += bill.value;
            });
            return sum;
        },
        status: function(){
            var bills = this.$root.$children[0].billsPay;
            if(!bills.length){
                return false;
            }
            var count = 0;
            for(var i in bills){
                if(!bills[i].done){
                    count++;
                }
            }
            return count;
        }
    }
});