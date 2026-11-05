import React from 'react';
import * as AccordionReactStories from '../components/accordion/Accordion.React.stories.jsx';
import * as BannerReactStories from '../components/banner/Banner.React.stories.jsx';
import * as CharacterCountReactStories from '../components/character-count/CharacterCount.React.stories.jsx';
import * as ComboboxReactStories from '../components/combobox/Combobox.React.stories.jsx';
import * as DatePickerReactStories from '../components/date-picker/DatePicker.React.stories.jsx';
import * as DateRangePickerReactStories from '../components/date-range-picker/DateRangePicker.React.stories.jsx';
import * as HeaderReactStories from '../components/header/Header.React.stories.jsx';
import * as InPageNavReactStories from '../components/in-page-nav/InPageNav.React.stories.jsx';
import * as LanguageSelectorReactStories from '../components/language-selector/LanguageSelector.React.stories.jsx';
import * as ModalReactStories from '../components/modal/Modal.React.stories.jsx';
import * as RangeSliderReactStories from '../components/range-slider/RangeSlider.React.stories.jsx';
import * as TableReactStories from '../components/table/Table.React.stories.jsx';
import * as TimePickerReactStories from '../components/time-picker/TimePicker.React.stories.jsx';
import * as CarouselReactStories from '../components/carousel/Carousel.React.stories.jsx';
import * as DataTableReactStories from '../components/data-table/DataTable.React.stories.jsx';
import * as DrawerReactStories from '../components/drawer/Drawer.React.stories.jsx';
import * as FileInputReactStories from '../components/file-input/FileInput.React.stories.jsx';
import * as LayoutReactStories from '../components/layout/Layout.React.stories.jsx';
import * as PopoverReactStories from '../components/popover/Popover.React.stories.jsx';
import * as ThemePickerReactStories from '../components/theme-picker/ThemePicker.React.stories.jsx';

export default {
  title: 'States/Unenhanced/React Components',
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

export const AccordionReact = moved(AccordionReactStories, 'Unenhanced', 'Accordion');
export const BannerReact = moved(BannerReactStories, 'Unenhanced', 'Banner');
export const CharacterCountReact = moved(CharacterCountReactStories, 'Unenhanced', 'CharacterCount');
export const ComboboxReact = moved(ComboboxReactStories, 'Unenhanced', 'Combobox');
export const DatePickerReact = moved(DatePickerReactStories, 'Unenhanced', 'DatePicker');
export const DateRangePickerReact = moved(DateRangePickerReactStories, 'Unenhanced', 'DateRangePicker');
export const HeaderReact = moved(HeaderReactStories, 'Unenhanced', 'Header');
export const InPageNavReact = moved(InPageNavReactStories, 'Unenhanced', 'InPageNav');
export const LanguageSelectorReact = moved(LanguageSelectorReactStories, 'Unenhanced', 'LanguageSelector');
export const ModalReact = moved(ModalReactStories, 'Unenhanced', 'Modal');
export const RangeSliderReact = moved(RangeSliderReactStories, 'Unenhanced', 'RangeSlider');
export const TableReact = moved(TableReactStories, 'Unenhanced', 'Table');
export const TimePickerReact = moved(TimePickerReactStories, 'Unenhanced', 'TimePicker');
export const CarouselReact = moved(CarouselReactStories, 'Unenhanced', 'Carousel');
export const DataTableReact = moved(DataTableReactStories, 'Unenhanced', 'DataTable');
export const DrawerReact = moved(DrawerReactStories, 'Unenhanced', 'Drawer');
export const FileInputUSWDSReact = moved(FileInputReactStories, 'UnenhancedUSWDS', 'FileInput: USWDS unavailable');
export const FileInputUSXReact = moved(FileInputReactStories, 'UnenhancedUSX', 'FileInput: USX unavailable');
export const LayoutReact = moved(LayoutReactStories, 'Unenhanced', 'Layout');
export const PopoverReact = moved(PopoverReactStories, 'Unenhanced', 'Popover');
export const ThemePickerReact = moved(ThemePickerReactStories, 'Unenhanced', 'ThemePicker');
