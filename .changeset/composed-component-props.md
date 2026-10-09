---
"@solexllc/usx-react": minor
"@solexllc/usx-contracts": minor
---

Replace duplicated child-component shapes with references and pass the full props through in React and Django.

Migrate Card tags/actions/images to tagProps/buttonProps/imageProps; Hero button to buttonProps (text becomes label or children); Collection item calendarDate to calendarDateProps (wrap date strings in { datetime }); and CheckboxGroup options to checkboxProps. The React types now derive from the child components rather than separate CardTag/CardAction/CardImage, HeroButtonProps, and CheckboxOption shapes.

Card keeps its default hidden captions and merges the single-image layout class with the supplied class. Collection defaults underCollection to true. Checkbox item props override group name/tile/small defaults, and missing IDs use the group id or name plus the item index. Update stories and shared Django composition paths, including CardGroup, ButtonGroup, and carousel images.
