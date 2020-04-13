<script>
// easy fix: prevent a resubmit on refresh and back button.
// credit: https://stackoverflow.com/a/45656609
if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href )
}
</script>
