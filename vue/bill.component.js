window.billComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="menu in menus"><a v-link="{name: menu.routeName}">{{ menu.name }}</a></li>
        </ul>
    </nav>
    <router-view></router-view>
    `,
    data: function () {
        return{
            menus: [
                {name: "Dashboard", routeName: 'dashboard'},
                {name: "Contas a pagar", routeName: 'bill-pay.list'},
                {name: "Contas a receber", routeName: 'bill-receive'}
            ],
        };
    }
});
