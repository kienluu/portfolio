from ConfigParser import ConfigParser as BaseConfigParser

class ConfigParser(BaseConfigParser):

    def getlist(self, section, option):
        string = self.get(section, option).strip()
        if string:
            string_list = [ item.strip() for item in string.split(',')]
        else:
            string_list = []

        return string_list
