<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Quote;
use App\Models\QuoteItems;

class QuoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 20; $i++) {
            $id = fake()->uuid();
            Quote::create([
                'id' => $id,
                'number' => Quote::getQuoteNumber(),
                'status' => fake()->randomElement(['draft', 'sent', 'paid', 'cancelled']),
                'date' => fake()->dateTimeBetween('-1 years', 'now'),
                'valid_until' => fake()->dateTimeBetween('-1 years', 'now'),
                'notes' => fake()->text(200),
                'footer' => fake()->text(200),
                'currency' => fake()->randomElement(['EUR', 'USD']),
                'discount' => fake()->randomFloat(2, 0, 100),
            ]);

            for ($j = 0; $j < 3; $j++) {
                $product = \App\Models\Product::all()->random();
                $quality = fake()->numberBetween(1, 10);
                $discount = fake()->randomFloat(2, 0, 100);
                QuoteItems::create([
                    'id' => fake()->uuid(),
                    'quote_id' => $id,
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'description' => fake()->sentence(),
                    'price' => $product->sell_price,
                    'quantity' => $quality,
                    'unit' => $product->unit,
                    'discount' => $discount,
                    'total' => $product->sell_price * $quality - $product->sell_price * $quality * ($discount / 100),
                ]);
            }

            // Calculate totals
            $quote = Quote::find($id);

            $items = QuoteItems::where('quote_id', $id)->get();
            $total = 0;
            foreach ($items as $item) {
                $total += $item->total;
            }
            $discount = $quote->discount;
            $quote->total = $total - $total * ($discount / 100);
            $quote->save();

            incrementLastItemNumber('quote');
        }
    }
}
