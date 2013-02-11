from tastypie.cache import NoCache
from django.core.cache import cache

class SimpleCache(NoCache):
    """
    Uses Django's current ``CACHE_BACKEND`` to store cached data.

    This is tastypies timeout but it takes a timeout value.  It is in the
    branch but not in the stable branch of tastypie at the time of writing.

    This will default to use the cache backends default timeout too, rather than 60
    seconds.
    """

    def __init__(self, timeout=None):
        super(SimpleCache, self).__init__()
        self.timeout = timeout

    def get(self, key):
        """
        Gets a key from the cache. Returns ``None`` if the key is not found.
        """
        return cache.get(key)

    def set(self, key, value, timeout=None):
        """
        Sets a key-value in the cache.

        Optionally accepts a ``timeout`` in seconds. Defaults to ``60`` seconds.
        """
        if timeout is None:
            timeout = self.timeout
        cache.set(key, value, timeout)
