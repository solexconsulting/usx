"""
Base Component class for the Django component system.

This class serves as the foundation for all components. Components inherit from this class
and define their name, template, and default props. The get_context method allows for
custom context preparation based on props.
"""

class Component:
    """
    Base class for Django components.

    Attributes:
        name (str): The unique name of the component (e.g., 'usx/button').
        template (str): The path to the template file relative to the components directory.
        props (dict): Default props for the component, with types and options for Storybook.
    """
    name = None
    template = None
    props = {}

    def get_context(self, **props):
        """
        Prepare the context for rendering the component template.

        This method can be overridden in subclasses to perform custom logic
        on the props before passing them to the template.

        Args:
            **props: The props passed to the component.

        Returns:
            dict: The context dictionary to be used in the template.
        """
        return props