<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndexProducts()
    {
        $this->get('/api/products')
            ->assertSuccessful();
    }

    /**
     * @dataProvider products
     */
    public function testStoreProduct(array $product)
    {
        $this->post('/api/products', $product)
            ->assertSuccessful();

        $this->assertDatabaseHas('products', $product);
    }

    /**
     * @dataProvider invalidProducts
     */
    public function testStoreInvalidProduct(array $product)
    {
        $this->post('/api/products', $product)
            ->assertStatus(302);
    }

    public function products()
    {
        return [
            [
                [
                    'name' => "Death Stranding",
                    'price' => 125,
                    'quantity' => 200,
                ],
                [
                    'name' => "Tusk Director's Cut: Collector's Edition",
                    'price' => 65,
                    'quantity' => 1,
                ]
            ]
        ];
    }

    public function invalidProducts()
    {
        return [
            [
                [
                    'name' => " ",
                    'price' => "a",
                    'quantity' => "a",
                ]
            ]
        ];
    }
    public function testUpdateProducts()
    {
        $product = Product::factory()->create();
        $this->put(
            "/api/products/$product->id",
            [
                'name' => "Junji Ito",
                'price' => 500,
                'quantity' => 3
            ]
        )->assertSuccessful();
    }

    public function testDeleteProducts()
    {
        $product = Product::factory()->create();
        $this->delete(
            "/api/products/$product->id"
        )->assertSuccessful();

    }

    public function testBulkUpdate()
    {
        $product = Product::factory()->create();
        $newProduct = Product::factory()->make();
        $this->post(
            "/api/bulk-products",
            [   
                $product->toArray(),
                $newProduct->toArray(),
            ]
        )->assertSuccessful();
    }
}
