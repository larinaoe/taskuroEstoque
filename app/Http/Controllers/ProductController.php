<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkUpdateRequest;
use App\Http\Requests\ProductStoreRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): Collection
    {
        return Product::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductStoreRequest $request)
    {
        $data = $request->all();
        return Product::create([
            'name' => $data['name'],
            'price' => $data['price'],
            'quantity' => $data['quantity']
        ]);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductStoreRequest $request, Product $product)
    {
        $data = $request->all();
        $product->name = $data['name'];
        $product->price = $data['price'];
        $product->quantity = $data['quantity'];
        $product->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
    }

    public function bulkUpdate(BulkUpdateRequest $request)
    {
        $data = $request->all();
        foreach ($data as $product) {
            if ((int)$product['id'] !== 0) {
                $productModel = Product::find($product['id']);
                $productModel->name = $product['name'];
                $productModel->price = $product['price'];
                $productModel->quantity = $product['quantity'];
                $productModel->save();
                continue;
            }
            Product::create([
                'name' => $product['name'],
                'price' => $product['price'],
                'quantity' => $product['quantity']

            ]);
        }
    }
}
