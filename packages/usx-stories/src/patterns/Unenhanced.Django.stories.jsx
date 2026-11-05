import React from 'react';
import * as AccordionDjangoStories from '../components/accordion/Accordion.Django.stories.jsx';
import * as BannerDjangoStories from '../components/banner/Banner.Django.stories.jsx';
import * as CharacterCountDjangoStories from '../components/character-count/CharacterCount.Django.stories.jsx';
import * as ComboboxDjangoStories from '../components/combobox/Combobox.Django.stories.jsx';
import * as DatePickerDjangoStories from '../components/date-picker/DatePicker.Django.stories.jsx';
import * as DateRangePickerDjangoStories from '../components/date-range-picker/DateRangePicker.Django.stories.jsx';
import * as HeaderDjangoStories from '../components/header/Header.Django.stories.jsx';
import * as InPageNavDjangoStories from '../components/in-page-nav/InPageNav.Django.stories.jsx';
import * as LanguageSelectorDjangoStories from '../components/language-selector/LanguageSelector.Django.stories.jsx';
import * as ModalDjangoStories from '../components/modal/Modal.Django.stories.jsx';
import * as RangeSliderDjangoStories from '../components/range-slider/RangeSlider.Django.stories.jsx';
import * as TableDjangoStories from '../components/table/Table.Django.stories.jsx';
import * as TimePickerDjangoStories from '../components/time-picker/TimePicker.Django.stories.jsx';
import * as CarouselDjangoStories from '../components/carousel/Carousel.Django.stories.jsx';
import * as DataTableDjangoStories from '../components/data-table/DataTable.Django.stories.jsx';
import * as DrawerDjangoStories from '../components/drawer/Drawer.Django.stories.jsx';
import * as FileInputDjangoStories from '../components/file-input/FileInput.Django.stories.jsx';
import * as LayoutDjangoStories from '../components/layout/Layout.Django.stories.jsx';
import * as PopoverDjangoStories from '../components/popover/Popover.Django.stories.jsx';
import * as ThemePickerDjangoStories from '../components/theme-picker/ThemePicker.Django.stories.jsx';

export default {
  title: 'States/Unenhanced/Django Components',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'These stories show how components behave when JavaScript cannot enhance their markup. This can happen when an application misses an initializer or loads it too early, when a script fails to load, when JavaScript is disabled, or when a browser lacks a needed capability. Each example retains its rendered content and shows which interactions depend on enhancement.',
      },
    },
  },
};

// Reuse each component story's renderer and initializer along with its own description.
const moved = (module, key, name) => {
  const meta = module.default;
  const story = module[key];
  return {
    ...story,
    name,
    argTypes: { ...meta.argTypes, ...story.argTypes },
    decorators: [...(meta.decorators || []), ...(story.decorators || [])],
    parameters: {
      ...(meta.parameters?.layout ? { layout: meta.parameters.layout } : {}),
      ...story.parameters,
    },
    render: story.render ?? meta.render ?? ((args) => React.createElement(meta.component, args)),
  };
};

export const AccordionDjango = moved(AccordionDjangoStories, 'Unenhanced', 'Accordion');
export const BannerDjango = moved(BannerDjangoStories, 'Unenhanced', 'Banner');
export const CharacterCountDjango = moved(CharacterCountDjangoStories, 'Unenhanced', 'CharacterCount');
export const ComboboxDjango = moved(ComboboxDjangoStories, 'Unenhanced', 'Combobox');
export const DatePickerDjango = moved(DatePickerDjangoStories, 'Unenhanced', 'DatePicker');
export const DateRangePickerDjango = moved(DateRangePickerDjangoStories, 'Unenhanced', 'DateRangePicker');
export const HeaderDjango = moved(HeaderDjangoStories, 'Unenhanced', 'Header');
export const InPageNavDjango = moved(InPageNavDjangoStories, 'Unenhanced', 'InPageNav');
export const LanguageSelectorDjango = moved(LanguageSelectorDjangoStories, 'Unenhanced', 'LanguageSelector');
export const ModalDjango = moved(ModalDjangoStories, 'Unenhanced', 'Modal');
export const RangeSliderDjango = moved(RangeSliderDjangoStories, 'Unenhanced', 'RangeSlider');
export const TableDjango = moved(TableDjangoStories, 'Unenhanced', 'Table');
export const TimePickerDjango = moved(TimePickerDjangoStories, 'Unenhanced', 'TimePicker');
export const CarouselDjango = moved(CarouselDjangoStories, 'Unenhanced', 'Carousel');
export const DataTableDjango = moved(DataTableDjangoStories, 'Unenhanced', 'DataTable');
export const DrawerDjango = moved(DrawerDjangoStories, 'Unenhanced', 'Drawer');
export const FileInputUSWDSDjango = moved(FileInputDjangoStories, 'UnenhancedUSWDS', 'FileInput: USWDS unavailable');
export const FileInputUSXDjango = moved(FileInputDjangoStories, 'UnenhancedUSX', 'FileInput: USX unavailable');
export const LayoutDjango = moved(LayoutDjangoStories, 'Unenhanced', 'Layout');
export const PopoverDjango = moved(PopoverDjangoStories, 'Unenhanced', 'Popover');
export const ThemePickerDjango = moved(ThemePickerDjangoStories, 'Unenhanced', 'ThemePicker');
