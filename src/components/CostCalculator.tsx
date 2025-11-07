import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

interface PremiumFeature {
  id: string;
  label: string;
  price: number;
}

const saunaTypes = [
  { value: "traditional", label: "Traditional Finnish Sauna", basePrice: 8000 },
  { value: "infrared", label: "Infrared Sauna", basePrice: 6500 },
  { value: "steam", label: "Steam Room", basePrice: 10000 },
  { value: "outdoor", label: "Outdoor Sauna", basePrice: 12000 },
  { value: "custom", label: "Custom Design", basePrice: 15000 },
];

const locations = [
  { value: "indoor", label: "Indoor Installation", multiplier: 1.0 },
  { value: "basement", label: "Basement", multiplier: 1.15 },
  { value: "outdoor", label: "Outdoor", multiplier: 1.25 },
  { value: "commercial", label: "Commercial Space", multiplier: 1.4 },
];

const premiumFeatures: PremiumFeature[] = [
  { id: "led", label: "LED Lighting", price: 500 },
  { id: "sound", label: "Sound System", price: 800 },
  { id: "wood", label: "Premium Wood Upgrade", price: 2000 },
  { id: "glass", label: "Glass Door Upgrade", price: 1200 },
  { id: "chromo", label: "Chromotherapy", price: 600 },
];

export const CostCalculator = () => {
  const [saunaType, setSaunaType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [size, setSize] = useState<number[]>([6]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const calculateEstimate = () => {
    if (!saunaType || !location) return 0;

    const selectedSauna = saunaTypes.find(s => s.value === saunaType);
    const selectedLocation = locations.find(l => l.value === location);
    
    if (!selectedSauna || !selectedLocation) return 0;

    // Base price * size factor * location multiplier
    const sizeFactor = size[0] / 6; // 6ft is the base size
    let total = selectedSauna.basePrice * sizeFactor * selectedLocation.multiplier;

    // Add premium features
    selectedFeatures.forEach(featureId => {
      const feature = premiumFeatures.find(f => f.id === featureId);
      if (feature) total += feature.price;
    });

    return Math.round(total);
  };

  const estimate = calculateEstimate();

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  return (
    <Card className="p-8">
      <h2 className="text-3xl font-bold mb-6">Sauna Cost Calculator</h2>
      <p className="text-muted-foreground mb-8">
        Get an instant estimate for your custom sauna project
      </p>

      <div className="space-y-6">
        {/* Sauna Type */}
        <div className="space-y-2">
          <Label htmlFor="sauna-type">Sauna Type *</Label>
          <Select value={saunaType} onValueChange={setSaunaType}>
            <SelectTrigger id="sauna-type">
              <SelectValue placeholder="Select sauna type" />
            </SelectTrigger>
            <SelectContent>
              {saunaTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Size */}
        <div className="space-y-2">
          <Label>Size (Length in feet): {size[0]}ft</Label>
          <Slider
            value={size}
            onValueChange={setSize}
            min={4}
            max={12}
            step={1}
            className="w-full"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Installation Location *</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select installation location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(loc => (
                <SelectItem key={loc.value} value={loc.value}>
                  {loc.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Premium Features */}
        <div className="space-y-3">
          <Label>Premium Features</Label>
          {premiumFeatures.map(feature => (
            <div key={feature.id} className="flex items-center space-x-2">
              <Checkbox
                id={feature.id}
                checked={selectedFeatures.includes(feature.id)}
                onCheckedChange={() => toggleFeature(feature.id)}
              />
              <label
                htmlFor={feature.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {feature.label} (${feature.price.toLocaleString()})
              </label>
            </div>
          ))}
        </div>

        {/* Estimate Display */}
        {estimate > 0 && (
          <div className="mt-8 p-6 bg-accent/10 rounded-lg border-2 border-accent">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Estimated Cost</p>
              <p className="text-4xl font-bold text-accent">
                ${estimate.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                *Final pricing may vary based on site conditions and custom requirements
              </p>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Button asChild className="w-full" size="lg">
          <Link to="/contact">Get Accurate Quote</Link>
        </Button>
      </div>

      {/* Additional Info */}
      <div className="mt-8 space-y-4 text-sm text-muted-foreground">
        <div>
          <h3 className="font-semibold text-foreground mb-2">What's Included:</h3>
          <ul className="space-y-1">
            <li>• Professional design consultation</li>
            <li>• Premium materials and construction</li>
            <li>• Complete installation service</li>
            <li>• Electrical and plumbing coordination</li>
            <li>• 1-year warranty on workmanship</li>
            <li>• Post-installation support</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground mb-2">Important Notes:</h3>
          <p className="mb-2">
            <strong>Pricing Accuracy:</strong> Our calculator provides estimates based on current market prices and standard installations. Final pricing may vary based on specific site conditions, local building codes, and custom requirements.
          </p>
          <p>
            <strong>Additional Costs:</strong> Estimates may not include permits, electrical upgrades, structural modifications, or site preparation. We'll provide a detailed breakdown during your consultation.
          </p>
        </div>
      </div>
    </Card>
  );
};