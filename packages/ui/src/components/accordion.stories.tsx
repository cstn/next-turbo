import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';
import { fn } from 'storybook/test';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: [ 'autodocs' ],
  args: {
    onValueChange: fn()
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const SingleItem: Story = {
  render: (args: {[key: string]: any }) => (
    <Accordion {...args} type="single" collapsible >
      <AccordionItem value="item-1">
        <AccordionTrigger>Item</AccordionTrigger>
        <AccordionContent>
          Yes. This is a single item accordion that can be collapsed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleItems: Story = {
  render: (args: {[key: string]: any }) => (
    <Accordion {...args}type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>
          Yes. This is a multiple item accordion that allows multiple items to be expanded at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>
          Yes. This is another multiple item accordion that allows multiple items to be expanded at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Item 3</AccordionTrigger>
        <AccordionContent>
          Yes. And this one more multiple item accordion that allows multiple items to be expanded at the same time.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Controlled: Story = {
  render: (args: {[key: string]: any }) => (
    <Accordion {...args} type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Default expanded item</AccordionTrigger>
        <AccordionContent>
          This accordion item is expanded by default using defaultValue.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second item</AccordionTrigger>
        <AccordionContent>
          This is the second accordion item.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
