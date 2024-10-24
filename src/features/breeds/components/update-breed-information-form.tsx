"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Dog = {
  breed: string;
  age: string;
  sex: "male" | "female";
  weight: string;
  image: string;
};

export default function UpdateBreedInformationsForm() {
  const [step, setStep] = useState(1);
  const [numDogs, setNumDogs] = useState(0);
  const [dogs, setDogs] = useState<Dog[]>([]);

  const handleNumDogsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value);
    setNumDogs(num);
    setDogs(
      Array(num).fill({
        breed: "",
        age: "",
        sex: "male",
        weight: "",
        image: "",
      }),
    );
  };

  const handleDogInfoChange = (
    index: number,
    field: keyof Dog,
    value: string,
  ) => {
    const newDogs = [...dogs];
    newDogs[index] = { ...newDogs[index], [field]: value };
    setDogs(newDogs);
  };

  const handleImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newDogs = [...dogs];
        newDogs[index] = { ...newDogs[index], image: reader.result as string };
        setDogs(newDogs);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Dog Breed Information Form</CardTitle>
        <CardDescription>Update information about your dog(s)</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={(step / 3) * 100} className="mb-4" />
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="numDogs">How many dogs do you have?</Label>
              <Input
                id="numDogs"
                type="number"
                min="0"
                value={numDogs}
                onChange={handleNumDogsChange}
              />
            </div>
            {numDogs === 0 ? (
              <p>Please browse our website and decide what breed to adopt!</p>
            ) : (
              dogs.map((dog, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-semibold">Dog {index + 1}</h3>
                  <Input
                    placeholder="Breed"
                    value={dog.breed}
                    onChange={(e) =>
                      handleDogInfoChange(index, "breed", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Age"
                    value={dog.age}
                    onChange={(e) =>
                      handleDogInfoChange(index, "age", e.target.value)
                    }
                  />
                  <RadioGroup
                    value={dog.sex}
                    onValueChange={(value) =>
                      handleDogInfoChange(
                        index,
                        "sex",
                        value as "male" | "female",
                      )
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id={`male-${index}`} />
                      <Label htmlFor={`male-${index}`}>Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id={`female-${index}`} />
                      <Label htmlFor={`female-${index}`}>Female</Label>
                    </div>
                  </RadioGroup>
                  <Input
                    placeholder="Weight (in kg)"
                    value={dog.weight}
                    onChange={(e) =>
                      handleDogInfoChange(index, "weight", e.target.value)
                    }
                  />
                </div>
              ))
            )}
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            {dogs.map((dog, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Upload image for {dog.breed}
                </h3>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
                />
              </div>
            ))}
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            {dogs.map((dog, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold">{dog.breed}</h3>
                <p>Age: {dog.age}</p>
                <p>Sex: {dog.sex}</p>
                <p>Weight: {dog.weight} kg</p>
                {dog.image && (
                  <img
                    src={dog.image}
                    alt={dog.breed}
                    className="w-full max-w-sm rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && <Button onClick={prevStep}>Previous</Button>}
        {step < 3 && numDogs > 0 && <Button onClick={nextStep}>Next</Button>}
        {step === 3 && (
          <Button onClick={() => alert("Form submitted!")}>Submit</Button>
        )}
      </CardFooter>
    </Card>
  );
}
../../users/hooks/use-update-password-modal
