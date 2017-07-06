window.billPayMenuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="menu in menus"><a v-link="{name: menu.routeName}">{{ menu.name }}</a></li>
        </ul>
    </nav>`,
    data: function () {
        return{
            menus: [
                //{id: 0, name: "Listar contas", url: '/bills'},
                //{id: 1, name: "Criar contas", url: '/bill/create'}
                {id: 0, name: "Listar contas", routeName: 'bill-pay.list'},
                {id: 1, name: "Criar conta", routeName: 'bill-pay.create'}
            ],
        };
    }
});
