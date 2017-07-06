<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application();

//Pay bills write and read
function getPayBill()
{
    $json = file_get_contents(__DIR__ . '/pay_bills.json');
    $data = json_decode($json, true);
    return $data['bills'];
}

function findPayIndexById($id)
{
    $bills = getPayBill();
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writePayBills($bills)
{
    $data = ['bills' => $bills];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/receive_bills.json', $json);
}

//Receive bills write and read

function getReceiveBill()
{
    $json = file_get_contents(__DIR__ . '/receive_bills.json');
    $data = json_decode($json, true);
    return $data['bills'];
}

function findReceiveIndexById($id)
{
    $bills = getReceiveBill();
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeReceiveBills($bills)
{
    $data = ['bills' => $bills];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/receive_bills.json', $json);
}


$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

//Routes pay bills
$app->get('api/pay/bills', function () use ($app) {
    $bills = getPayBill();
    return $app->json($bills);
});

$app->get('api/pay/bills/total', function () use ($app) {
    $bills = getPayBill();
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/pay/bills/{id}', function ($id) use ($app) {
    $bills = getPayBill();
    $bill = $bills[findPayIndexById($id)];
    return $app->json($bill);
});

$app->post('api/pay/bills', function (Request $request) use ($app) {
    $bills = getPayBill();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writePayBills($bills);
    return $app->json($data);
});

$app->put('api/pay/bills/{id}', function (Request $request, $id) use ($app) {
    $bills = getPayBill();
    $data = $request->request->all();
    $index = findPayIndexById($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writePayBills($bills);
    return $app->json($bills[$index]);
});

$app->delete('api/pay/bills/{id}', function ($id) {
    $bills = getPayBill();
    $index = findPayIndexById($id);
    array_splice($bills,$index,1);
    writePayBills($bills);
    return new Response("", 204);
});

//Routes receive bills
$app->get('api/receive/bills', function () use ($app) {
    $bills = getReceiveBill();
    return $app->json($bills);
});

$app->get('api/receive/bills/total', function () use ($app) {
    $bills = getReceiveBill();
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/receive/bills/{id}', function ($id) use ($app) {
    $bills = getReceiveBill();
    $bill = $bills[findReceiveIndexById($id)];
    return $app->json($bill);
});

$app->post('api/receive/bills', function (Request $request) use ($app) {
    $bills = getReceiveBill();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeReceiveBills($bills);
    return $app->json($data);
});

$app->put('api/receive/bills/{id}', function (Request $request, $id) use ($app) {
    $bills = getReceiveBill();
    $data = $request->request->all();
    $index = findReceiveIndexById($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeReceiveBills($bills);
    return $app->json($bills[$index]);
});

$app->delete('api/receive/bills/{id}', function ($id) {
    $bills = getReceiveBill();
    $index = findReceiveIndexById($id);
    array_splice($bills,$index,1);
    writeReceiveBills($bills);
    return new Response("", 204);
});

$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();