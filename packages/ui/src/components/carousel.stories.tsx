import type { Meta, StoryObj } from "@storybook/react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    opts: { control: "object" },
  },
  args: {
    opts: {
      loop: false,
      align: "start",
      dragFree: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Primary: Story = {
  render: (args: { [key: string]: any }) => (
    <Carousel opts={args.opts}>
      <CarouselContent>
        {Array.from({ length: 3 }, (_, i) => `Slide ${i + 1}`).map((slide: string, index: number) => (
          <CarouselItem key={index} className="h-40 bg-accent flex items-center justify-center">
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="abolute -left-4" />
      <CarouselNext className="abolute -right-4" />
    </Carousel>
  ),
};

export const WithManySlides: Story = {
  render: (args: { [key: string]: any }) => (
    <Carousel opts={args.opts}>
      <CarouselContent>
        {Array.from({ length: 10 }, (_, i) => `Slide ${i + 1}`).map((slide: string, index: number) => (
          <CarouselItem key={index} className="h-40 bg-accent flex items-center justify-center">
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="abolute -left-4" />
      <CarouselNext className="abolute -right-4" />
    </Carousel>
  ),
};

export const WithLoop: Story = {
  args: {
    opts: {
      loop: true,
    },
  },
  render: (args: { [key: string]: any }) => (
    <Carousel opts={args.opts}>
      <CarouselContent>
        {Array.from({ length: 3 }, (_, i) => `Slide ${i + 1}`).map((slide: string, index: number) => (
          <CarouselItem key={index} className="h-40 bg-accent flex items-center justify-center">
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="abolute -left-4" />
      <CarouselNext className="abolute -right-4" />
    </Carousel>
  ),
};
