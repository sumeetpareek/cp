#!/usr/bin/perl

use YAML;

use warnings;
use YAML::Dumper;
    my $dumper = YAML::Dumper->new;
    $dumper->indent_width(2);

    
$hash = {};
$first = 1;
while ( <> ) {
    if ($first) {
      $first = 0;
      next;
    }
    chomp;
    last unless /\S/;
    my ($a, $b) = split /,/;
    $a =~ s/\r\n//g; $a =~ s/\r//g; $a =~ s/\n//g;
    $b =~ s/\r\n//g; $b =~ s/\r//g; $b =~ s/\n//g;
    $hash->{'team_'.lc($a)} = {'name'=>$a, 'key'=>$b};
}
# $hash = {'match_01'=>{'start_time'=>'asdf','team_one'=>'asdf_team','team_two'=>'team_adf'}};
    print $dumper->dump($hash);
