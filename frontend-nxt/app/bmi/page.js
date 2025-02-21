'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LogNav from '../components/lognav';

export default function PersonalInfoForm() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activityLevel: 'sedentary',
  });
  const [results, setResults] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { age, weight, height, gender, activityLevel } = formData;
    const parsedAge = parseFloat(age);
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);

    const activityLevels = {
      sedentary: 1,
      'lightly active': 2,
      'moderately active': 3,
      'very active': 4,
      'extra active': 5,
    };

    const activityLevelInt = activityLevels[activityLevel.toLowerCase()];
    const BMI = parsedWeight / (parsedHeight * parsedHeight);
    const BMR =
      gender === 'male'
        ? 10 * parsedWeight + 6.25 * parsedHeight * 100 - 5 * parsedAge + 5
        : 10 * parsedWeight + 6.25 * parsedHeight * 100 - 5 * parsedAge - 161;

    let BMITags = '';
    if (BMI < 18.5) BMITags = 'Underweight';
    else if (BMI < 25) BMITags = 'Normal weight';
    else if (BMI < 30) BMITags = 'Overweight';
    else BMITags = 'Obese';

    let macronutrients = {
      underweight: { carb: 55, protein: 20, fat: 25 },
      'normal weight': { carb: 50, protein: 25, fat: 25 },
      overweight: { carb: 45, protein: 30, fat: 25 },
      obese: { carb: 40, protein: 30, fat: 30 },
    };

    let { carb, protein, fat } = macronutrients[BMITags.toLowerCase()];
    const calories = Math.round(BMR * activityLevelInt);

    setResults({
      activityLevel,
      BMI: BMI.toFixed(2),
      BMR: BMR.toFixed(2),
      BMITags,
      calories,
      requiredCarbs: Math.round((carb / 100) * calories / 4),
      requiredProtein: Math.round((protein / 100) * calories / 4),
      requiredFat: Math.round((fat / 100) * calories / 9),
    });
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white p-6">
      <LogNav />

      <div className="mt-20 max-w-xl mx-auto bg-black p-6 rounded-lg shadow-lg border border-blue-500">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">Enter Personal Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
            className="w-full p-2 border rounded bg-gray-800 text-white"
          />
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Weight (kg)"
            required
            className="w-full p-2 border rounded bg-gray-800 text-white"
          />
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Height (m)"
            required
            className="w-full p-2 border rounded bg-gray-800 text-white"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-800 text-white"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-800 text-white"
          >
            <option value="sedentary">0-2 (Sedentary)</option>
            <option value="lightly active">2-4 (Lightly Active)</option>
            <option value="moderately active">4-6 (Moderate)</option>
            <option value="very active">6-8 (Very Active)</option>
            <option value="extra active">8-10 (Extra Active)</option>
          </select>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>

      {results && (
        <div className="mt-6 max-w-xl mx-auto bg-black p-6 rounded-lg shadow-lg border border-blue-500">
          <h3 className="text-xl font-semibold mb-2 text-blue-300">Your Health Metrics</h3>
          <p>Activity Level: {results.activityLevel}</p>
          <p>BMI: {results.BMI}</p>
          <p>BMR: {results.BMR} kcal/day</p>
          <p>BMI Category: {results.BMITags}</p>
          <p>Calories to maintain weight: {results.calories}</p>
          <p>Carbs needed: {results.requiredCarbs}g</p>
          <p>Protein needed: {results.requiredProtein}g</p>
          <p>Fat needed: {results.requiredFat}g</p>
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded">
            Plan My Diet!
          </button>
        </div>
      )}
    </div>
  );
}
