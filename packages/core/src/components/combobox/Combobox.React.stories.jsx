
import Combobox from './Combobox';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';


const fruitOptions = [
  { value: '', label: 'Select a fruit' },
  { value: 'apple', label: 'Apple' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'avocado', label: 'Avocado' },
  { value: 'banana', label: 'Banana' },
  { value: 'blackberry', label: 'Blackberry' },
  { value: 'blood orange', label: 'Blood orange' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'boysenberry', label: 'Boysenberry' },
  { value: 'breadfruit', label: 'Breadfruit' },
  { value: 'buddhas hand citron', label: "Buddha's hand citron" },
  { value: 'cantaloupe', label: 'Cantaloupe' },
  { value: 'clementine', label: 'Clementine' },
  { value: 'crab apple', label: 'Crab apple' },
  { value: 'currant', label: 'Currant' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'custard apple', label: 'Custard apple' },
  { value: 'coconut', label: 'Coconut' },
  { value: 'cranberry', label: 'Cranberry' },
  { value: 'date', label: 'Date' },
  { value: 'dragonfruit', label: 'Dragonfruit' },
  { value: 'durian', label: 'Durian' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'gooseberry', label: 'Gooseberry' },
  { value: 'grape', label: 'Grape' },
  { value: 'grapefruit', label: 'Grapefruit' },
  { value: 'guava', label: 'Guava' },
  { value: 'honeydew melon', label: 'Honeydew melon' },
  { value: 'jackfruit', label: 'Jackfruit' },
  { value: 'kiwifruit', label: 'Kiwifruit' },
  { value: 'kumquat', label: 'Kumquat' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'lime', label: 'Lime' },
  { value: 'lychee', label: 'Lychee' },
  { value: 'mandarine', label: 'Mandarine' },
  { value: 'mango', label: 'Mango' },
  { value: 'mangosteen', label: 'Mangosteen' },
  { value: 'marionberry', label: 'Marionberry' },
  { value: 'nectarine', label: 'Nectarine' },
  { value: 'orange', label: 'Orange' },
  { value: 'papaya', label: 'Papaya' },
  { value: 'passionfruit', label: 'Passionfruit' },
  { value: 'peach', label: 'Peach' },
  { value: 'pear', label: 'Pear' },
  { value: 'persimmon', label: 'Persimmon' },
  { value: 'plantain', label: 'Plantain' },
  { value: 'plum', label: 'Plum' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'pluot', label: 'Pluot' },
  { value: 'pomegranate', label: 'Pomegranate' },
  { value: 'pomelo', label: 'Pomelo' },
  { value: 'quince', label: 'Quince' },
  { value: 'raspberry', label: 'Raspberry' },
  { value: 'rambutan', label: 'Rambutan' },
  { value: 'soursop', label: 'Soursop' },
  { value: 'starfruit', label: 'Starfruit' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'tamarind', label: 'Tamarind' },
  { value: 'tangelo', label: 'Tangelo' },
  { value: 'tangerine', label: 'Tangerine' },
  { value: 'ugli fruit', label: 'Ugli fruit' },
  { value: 'watermelon', label: 'Watermelon' },
  { value: 'white currant', label: 'White currant' },
  { value: 'yuzu', label: 'Yuzu' },
];

export const storyDefs = {
  Default: {
    id: 'fruit',
    name: 'fruit',
    label: 'Select a fruit',
    options: fruitOptions,
  },
  Disabled: {
    id: 'fruit-disabled',
    name: 'fruit-disabled',
    label: 'Select a fruit',
    disabled: true,
    options: fruitOptions,
  },
  Required: {
    id: 'fruit-required',
    name: 'fruit-required',
    label: 'Select a fruit',
    required: true,
    options: fruitOptions,
  },
  WithHint: {
    id: 'fruit-hint',
    name: 'fruit-hint',
    label: 'Select a fruit',
    hint: 'This is a hint to help the user select a fruit.',
    options: fruitOptions,
  },
  WithPlaceholder: {
    id: 'fruit-placeholder',
    name: 'fruit-placeholder',
    label: 'Select a fruit',
    placeholder: 'Select a fruit placeholder',
    options: fruitOptions,
  },
  WithDefaultValue: {
    id: 'fruit-default-value',
    name: 'fruit-default-value',
    label: 'Select a fruit',
    defaultValue: 'mango',
    options: fruitOptions,
  },
  WithError: {
    id: 'fruit-error',
    name: 'fruit-error',
    label: 'Select a fruit',
    error: 'This is an error message to help the user select a fruit.',
    options: fruitOptions,
  },
  WithOnSearch: {
    id: 'fruit-on-search',
    name: 'fruit-on-search',
    label: 'Select a fruit',
    options: fruitOptions,
    onSearch: (value) => alert(`Your search: ${value}`),
  },
  WithOnSelect: {
    id: 'fruit-on-select',
    name: 'fruit-on-select',
    label: 'Select a fruit',
    options: fruitOptions,
    onSelect: (value) => alert(`You selected: ${value}`),
  }
};

export default {
  title: 'React/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const Disabled = { args: storyDefs.Disabled };
export const Required = { args: storyDefs.Required };
export const WithHint = { args: storyDefs.WithHint };
export const WithPlaceholder = { args: storyDefs.WithPlaceholder };
export const WithDefaultValue = { args: storyDefs.WithDefaultValue };
export const WithError = { args: storyDefs.WithError };
export const WithOnSearch = { args: storyDefs.WithOnSearch };
export const WithOnSelect = { args: storyDefs.WithOnSelect };
