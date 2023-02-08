import Layout from '@/layout';
const Area = {
	path: '/bill',
	name: 'Bill',
	meta: {
		title: 'ROUTER.BILL',
		icon:"fas fa-file-invoice-dollar",
		roles:['customer']
	},
	component: Layout,
	redirect: {
		name: 'BillIndex'
	},
	children: [
		{
            path: 'index',
            name: 'BillIndex',
            meta: {
                title: "ROUTER.BILL"
            },
            component: () => import(
                '../../pages/Bill/bill.vue'
            )
		}
	]
};

export default Area;